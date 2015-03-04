<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
$this->title = 'About';
?>
<div class="container">
    <div class="site-about">
        <br/>
        <p><a class="" href="<?=\yii\helpers\Url::toRoute('/site/index')?>"><i class="glyphicon glyphicon-map-marker"></i> back to SF film locations</a></p>
        <h1><?= Html::encode($this->title) ?></h1>

        <p>
            This project is a submission for the Uber code challenge.
        </p>
    </div>
</div>