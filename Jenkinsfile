pipeline {
    agent {
        node {
            label 'nodejs'
        }

    }
    stages {
        stage('拉取代码') {
            agent none
            steps {
                container('nodejs') {
                    git(url: 'https://gitee.com/leifengyang/yygh-admin.git', credentialsId: 'github-id', branch: 'main', changelog: true, poll: false)
                    sh 'ls -al'
                }

            }
        }

        stage('项目编译') {
            agent none
            steps {
                container('nodejs') {
                    sh 'npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/'
                    sh 'npm install --registry=https://registry.npm.taobao.org'
                    sh 'npm run build'
                    sh 'ls'
                }

            }
        }

        stage('构建镜像') {
            agent none
            steps {
                container('nodejs') {
                    sh 'ls'
                    sh 'docker build -t yygh-admin:latest -f Dockerfile  .'
                }

            }
        }

        stage('推送镜像') {
            agent none
            steps {
                container('nodejs') {
                    withCredentials([usernamePassword(credentialsId : 'dockerhub-id' ,usernameVariable : 'DOCKER_USERNAME' ,passwordVariable : 'DOCKER_PASSWORD' ,)]) {
                        sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
                        sh 'docker tag maa-admin:latest $REGISTRY/$DOCKERHUB_NAMESPACE/maa-admin:SNAPSHOT-$BUILD_NUMBER'
                        sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/maa-admin:SNAPSHOT-$BUILD_NUMBER'
                    }

                }

            }
        }

        stage('部署到dev环境') {
            agent none
            steps {
                kubernetesDeploy(configs: 'deploy/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_CREDENTIAL_ID")
            }
        }

        //1、配置全系统的邮件：                   全系统的监控
        //2、修改ks-jenkins的配置，里面的邮件；   流水线发邮件
        stage('流水線完成') {
            agent none
            steps {
                sh 'echo "Pipline finish sucessful !! "'
            }
        }

    }
    environment {
        DOCKER_CREDENTIAL_ID = 'dockerhub-id'
        GITHUB_CREDENTIAL_ID = 'github-id'
        KUBECONFIG_CREDENTIAL_ID = 'demo-kubeconfig'
        REGISTRY = 'docker.io'
        GITHUB_ACCOUNT = 'hungwen0425'
        DOCKERHUB_NAMESPACE = 'hungwen0425'
    }
}
