## Git 常用命令总结

Git 是现代软件开发中不可或缺的版本控制系统，掌握常用命令能显著提升开发效率。以下是按场景分类的 Git 常用命令，结合示例和注意事项：

### **一、基础操作**

#### 1. **仓库初始化**

```bash
git init            # 初始化本地仓库
git clone <url>     # 克隆远程仓库
```

#### 2. **查看状态**

```bash
git status          # 查看工作区状态
git diff            # 查看工作区与暂存区的差异
git diff --staged   # 查看暂存区与本地仓库的差异
```

#### 3. **添加与提交**

```bash
git add .           # 添加所有文件到暂存区
git add <file>      # 添加指定文件到暂存区
git commit -m "msg" # 提交暂存区到本地仓库
git commit -am "msg" # 跳过暂存区，直接提交修改（需已跟踪的文件）
```

### **二、分支管理**

#### 1. **分支操作**

```bash
git branch                # 查看本地分支
git branch -r             # 查看远程分支
git branch -a             # 查看所有分支
git branch <name>         # 创建新分支
git checkout <name>       # 切换分支
git checkout -b <name>    # 创建并切换到新分支
git branch -d <name>      # 删除本地分支（需已合并）
git branch -D <name>      # 强制删除本地分支
```

#### 2. **分支合并**

```bash
git merge <branch>        # 合并指定分支到当前分支
git rebase <branch>       # 将当前分支基于指定分支进行变基
```

#### 3. **远程分支**

```bash
git push origin <branch>  # 推送本地分支到远程
git push -u origin <branch> # 推送并关联远程分支
git pull                  # 拉取并合并远程分支
git fetch                 # 仅拉取远程分支，不合并
```

### **三、撤销操作**

#### 1. **工作区修改**

```bash
git restore <file>        # 丢弃工作区修改
git restore --staged <file> # 取消暂存
```

#### 2. **提交历史**

```bash
git reset --soft HEAD~1   # 撤销提交，保留修改（软重置）
git reset --mixed HEAD~1  # 撤销提交和暂存，保留修改（默认）
git reset --hard HEAD~1   # 彻底删除提交和修改（危险）
git revert <commit>       # 创建一个新提交，撤销指定提交的修改
```

### **四、远程仓库**

#### 1. **远程仓库操作**

```bash
git remote -v             # 查看远程仓库信息
git remote add <name> <url> # 添加远程仓库
git remote remove <name>  # 删除远程仓库
git remote rename <old> <new> # 重命名远程仓库
```

#### 2. **推送与拉取**

```bash
git push                  # 推送本地分支到关联的远程分支
git push -f               # 强制推送（覆盖远程，谨慎使用）
git pull                  # 拉取并合并远程分支
git pull --rebase         # 使用 rebase 方式拉取并合并
```

### **五、标签管理**

```bash
git tag                   # 查看所有标签
git tag <name>            # 创建轻量标签
git tag -a <name> -m "msg" # 创建附注标签
git push origin <tag>     # 推送标签到远程
git push origin --tags    # 推送所有标签到远程
git tag -d <name>         # 删除本地标签
git push origin :refs/tags/<name> # 删除远程标签
```

### **六、日志查看**

```bash
git log                   # 查看提交历史
git log --oneline         # 单行显示提交历史
git log --graph           # 图形化显示分支合并历史
git log -p <file>         # 查看指定文件的修改历史
git blame <file>          # 查看文件每行的最后修改者
```

### **七、比较与差异**

```bash
git diff <commit1> <commit2> # 比较两个提交的差异
git diff <branch1> <branch2> # 比较两个分支的差异
git diff --name-only <commit1> <commit2> # 只显示文件名
```

### **八、高级操作**

#### 1. **暂存工作**

```bash
git stash                 # 暂存当前工作区修改
git stash list            # 查看暂存列表
git stash apply           # 恢复最近一次暂存
git stash pop             # 恢复并删除最近一次暂存
git stash drop            # 删除最近一次暂存
```

#### 2. **子模块**

```bash
git submodule add <url>   # 添加子模块
git submodule update      # 更新子模块
git submodule init        # 初始化子模块
git submodule update --init --recursive # 递归初始化所有子模块
```

#### 3. **清理工作区**

```bash
git clean -n              # 预览将被删除的文件
git clean -f              # 删除未跟踪的文件
git clean -fd             # 删除未跟踪的文件和目录
```

### **九、配置**

```bash
git config --global user.name "Your Name" # 设置全局用户名
git config --global user.email "email@example.com" # 设置全局邮箱
git config --global core.editor vim       # 设置默认编辑器
git config --list                         # 查看配置
```

### **十、实用技巧**

#### 1. **恢复误删的分支**

```bash
git reflog                # 查看所有操作记录
git checkout -b <branch> <commit-hash> # 从特定提交创建分支
```

#### 2. **忽略文件**

在项目根目录创建 `.gitignore` 文件，列出需要忽略的文件或目录：

```plaintext
node_modules/
*.log
dist/
```

#### 3. **别名**

```bash
git config --global alias.co checkout    # 简化命令
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

### **总结**

- **基础工作流**：`git add` → `git commit` → `git push/pull`
- **分支管理**：`git branch`、`git checkout`、`git merge/rebase`
- **撤销操作**：`git restore`、`git reset`、`git revert`
- **远程协作**：`git remote`、`git push/pull`、`git fetch`



建议从基础命令开始练习，逐步掌握高级操作。通过 `git help <command>` 可查看详细文档，使用 `--dry-run` 或 `--no-ff` 等参数避免意外修改。