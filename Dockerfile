FROM schmunk42/yii2-app-basic
MAINTAINER Mahmoud Saada <mahmoudsaada@gmail.com>

ADD nginx.conf /etc/nginx/nginx.conf

CMD ["/root/run.sh"]
EXPOSE 80