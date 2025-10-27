[BASH image](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Gnu-bash-logo.svg/1200px-Gnu-bash-logo.svg.png)

# BASH

Commands in BASH terminal


## pwd

path to working directory

```sh
$pwd
/home/seizquie/neoland/workspace
```

## ls

List files and folders (directories)

```sh
$ ls
42  neoland
```

## ls - l

List files and folders with details

```sh
total 8
drwxr-xr-x 4 seizquie seizquie 4096 Oct 22 20:04 42
drwxr-xr-x 5 seizquie seizquie 4096 Oct 22 21:33 neoland
```
## ls - a

Shows visible and hidden files and folders in given path

 ```sh
$ .  ..  .git  staff
 ```

## mkdir folder-name

Creates a folder with the provide name

```sh
$ mkdir workspace
```

## touch

Creates an empty file wirth de given name

```sh
$ touch readme.txt
```

## chmod rwx file-name/folder-name

Updates permissions in given folder or file

```sh
$ chmod 700 readme.txt
```

## nano file-name

```sh
$ nano readme.txt
```

## rm file-name
```sh
$ rm readme.txt
```
## rmdir folder-name

Removes a given folders when is empty

```sh
$ rmdir temp
```
## cd folder-name

Changes from the current folder to the given folder path

```sh
$ cd workspace
```

 152 changes: 152 additions & 0 deletions152  
staff/sergio-izquierdo/playground/git/README.md
Viewed
Original file line number	Diff line number	Diff line change
@@ -0,0 +1,152 @@
![Git image](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1200px-Git-logo.svg.png)

# Git - The Stupid Content Tracker

Git commands in terminal

## git init

Initializes a local folder as a repository
```sh
$ git init
Initialized existing Git repository in /home/seizquie/neoland/workspace/neoland-202510/.git/
```

## git remote add origin repo-address

Connects the local repository to its origin in GitHub.

```sh
$  git remote add origin https://github.com/seritoo/neoland-202510
```

## git pull

Pulls all the changes from remote (origin) repository.

```sh
$ git pull
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (4/4), 1.84 KiB | 236.00 KiB/s, done.
From https://github.com/seritoo/neoland-202510
 * [new branch]      main       -> origin/main
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> master
```
## git branch -a

Shows all the branches in the repository

```sh
$ git branch -a
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
```

## git switch main

Changes the branch to the given one

```sh
$ git switc
h main
branch 'main' set up to track 'origin/main'.
Switched to a new branch 'main'
```

## git branch

Shows the local branches

```sh
$ git branch
* main  (el asterisco muestra la rama en la que estás)
```

## git status
Show the status of files in local repo.

```sh
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        staff/
   nothing added to commit but untracked files present (use "git add" to track)
```

## git add content-name

Adds content to staging.

```sh
$ git add staff
```
## git config setting

Configures settings in local git

```sh
$ git config user.email "seritodev@gmail.com"
$ git config user.name "Sergio Izquierdo"
```
## git commit -m "message"

Consolidate the changes in local repository

```sh
$ git commit -m "add bash and git docs"
```

## git push

Pushes the changes from local to remote repository

```sh
$ git push
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 16 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (9/9), 2.07 KiB | 1.04 MiB/s, done.
Total 9 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/seritoo/neoland-202510
   c0018b0..e8473e1  main -> main
```

## git log

Commits history ordered descending by time

```sh
$ git log
commit 4ed52eca23bcccf471a3262a5544ea36493a14b2 (HEAD -> main, origin/main, origin/HEAD)
Author: Sergio Izquierdo <seritodev@gmail.com>
Date:   Thu Oct 23 22:04:52 2025 +0200

    add new git's documentation
commit e8473e1ab2c55a303665165145e86c8a326bf6e0
Author: Sergio Izquierdo <seritodev@gmail.com>
Date:   Thu Oct 23 21:52:13 2025 +0200
    add bash and git docs
commit c0018b0a7fcd2974422226e792bbc4c080df6e91
Author: manuelbarzi <manuelbarzi@gmail.com>
Date:   Thu Oct 23 20:10:57 2025 +0200
    Initial commit
```

