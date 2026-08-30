param(
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$repositoryUrl = "https://github.com/YKYsia/YKYsia.github.io.git"
$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path

function Invoke-Git {
    & git @args
    if ($LASTEXITCODE -ne 0) {
        throw "Git 命令执行失败：git $($args -join ' ')"
    }
}

Push-Location $scriptDirectory

try {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        throw "未检测到 Git。请先安装 Git for Windows，然后重新运行此脚本。"
    }

    $insideRepository = (& git rev-parse --is-inside-work-tree 2>$null) -eq "true"

    if (-not $insideRepository) {
        Write-Host "当前目录尚未关联 GitHub，正在进行首次初始化..." -ForegroundColor Cyan
        Invoke-Git init
        Invoke-Git remote add origin $repositoryUrl
        Invoke-Git fetch origin main

        # 仅建立线上版本的比较基准，不覆盖本地工作文件。
        Invoke-Git reset origin/main
        Invoke-Git branch -M main
        Invoke-Git branch --set-upstream-to=origin/main main
    }
    else {
        $repositoryRoot = (& git rev-parse --show-toplevel).Trim()
        if ([System.IO.Path]::GetFullPath($repositoryRoot) -ne [System.IO.Path]::GetFullPath($scriptDirectory)) {
            throw "脚本目录不是当前 Git 仓库的根目录，已停止上传以避免提交错误的文件。"
        }

        $originUrl = (& git remote get-url origin 2>$null)
        if ($LASTEXITCODE -ne 0) {
            Write-Host "未检测到 origin，正在关联 GitHub 仓库..." -ForegroundColor Cyan
            Invoke-Git remote add origin $repositoryUrl
        }
        else {
            $allowedUrls = @(
                $repositoryUrl,
                "https://github.com/YKYsia/YKYsia.github.io",
                "git@github.com:YKYsia/YKYsia.github.io.git"
            )

            if ($allowedUrls -notcontains $originUrl.Trim()) {
                throw "origin 指向 '$($originUrl.Trim())'，不是预期的 YKYsia.github.io 仓库。"
            }
        }

        $currentBranch = (& git branch --show-current).Trim()
        if ($currentBranch -ne "main") {
            throw "当前分支是 '$currentBranch'，请切换到 main 分支后再运行脚本。"
        }
    }

    $userName = (& git config --get user.name 2>$null)
    if ([string]::IsNullOrWhiteSpace(($userName -join ""))) {
        do {
            $userName = Read-Host "尚未配置 Git 用户名，请输入用户名"
        } while ([string]::IsNullOrWhiteSpace($userName))

        Invoke-Git config user.name $userName.Trim()
        Write-Host "已为本项目配置用户名：$($userName.Trim())" -ForegroundColor Green
    }
    else {
        Write-Host "已检测到 Git 用户名，跳过配置：$(($userName -join '').Trim())" -ForegroundColor DarkGray
    }

    $userEmail = (& git config --get user.email 2>$null)
    if ([string]::IsNullOrWhiteSpace(($userEmail -join ""))) {
        do {
            $userEmail = Read-Host "尚未配置 Git 邮箱，请输入 GitHub 邮箱"
        } while ([string]::IsNullOrWhiteSpace($userEmail))

        Invoke-Git config user.email $userEmail.Trim()
        Write-Host "已为本项目配置邮箱：$($userEmail.Trim())" -ForegroundColor Green
    }
    else {
        Write-Host "已检测到 Git 邮箱，跳过配置：$(($userEmail -join '').Trim())" -ForegroundColor DarkGray
    }

    $changes = (& git status --porcelain)
    if ([string]::IsNullOrWhiteSpace(($changes -join ""))) {
        Write-Host "没有检测到需要上传的改动。" -ForegroundColor Yellow
        exit 0
    }

    if ([string]::IsNullOrWhiteSpace($Message)) {
        $Message = "更新网站 $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    }

    Write-Host "正在提交本地改动..." -ForegroundColor Cyan
    Invoke-Git add --all
    Invoke-Git commit -m $Message

    Write-Host "正在同步 GitHub 上的最新版本..." -ForegroundColor Cyan
    Invoke-Git pull --rebase origin main

    Write-Host "正在上传并触发网站更新..." -ForegroundColor Cyan
    Invoke-Git push -u origin main

    Write-Host "上传成功。GitHub Pages 将自动更新：https://ykysia.github.io/" -ForegroundColor Green
}
catch {
    Write-Host "上传失败：$($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
finally {
    Pop-Location
}
