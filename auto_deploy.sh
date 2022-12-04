#!/bin/bash
# 启动自动部署，当前目录执行下列语句。当前 shell 后台常驻运行，每30秒拉取一次git代码。 
# nohup ./auto_deploy.sh > auto_deploy.log 2>&1 &
# 后台启动 shell，日志输出到 auto_deploy.log

# 终止自动部署
# ps auxf | grep 'auto_deploy' 查看后台运行的shell的 id，
# kill id 杀死脚本

while true
do
  git remote update
	LOCAL=$(git rev-parse @)
	REMOTE=$(git rev-parse "origin/master")
	if [ $LOCAL = $REMOTE ];then
	  echo "up-to-date"
	else
	  git checkout master
	  git pull
	fi	
  sleep 30 #每 30 秒循环一次
done

