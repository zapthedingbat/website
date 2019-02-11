# SSH to host and deploy docker image
ssh-keyscan $SSH_DEPLOY_HOST >> ~/.ssh/known_hosts

echo "Stopping service"
ssh -C $SSH_DEPLOY_USER@$SSH_DEPLOY_HOST docker stop $CIRCLE_PROJECT_REPONAME
ssh -C $SSH_DEPLOY_USER@$SSH_DEPLOY_HOST docker rm $CIRCLE_PROJECT_REPONAME

echo "Deploying latest version"
docker save $CIRCLE_PROJECT_REPONAME | ssh -C $SSH_DEPLOY_USER@$SSH_DEPLOY_HOST docker load

echo "Starting servie"
ssh -C $SSH_DEPLOY_USER@$SSH_DEPLOY_HOST docker run \
-d --restart=always \
-e MONGO_URI=$MONGO_URI \
-e COOKIE_SECRET=$COOKIE_SECRET \
-e NAME=name \
-e BRAND=brand \
--name $CIRCLE_PROJECT_REPONAME \
-p 80:3000 \
$CIRCLE_PROJECT_REPONAME
