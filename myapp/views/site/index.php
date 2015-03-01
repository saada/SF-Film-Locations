<?php
/* @var $this yii\web\View */
$this->title = 'San Francisco Films';
?>
<div class="site-index">

    <div class="jumbotron">
        <div class="container">
            <h1><i class="glyphicon glyphicon-film"></i> San Francisco Filming Locations</h1>

            <p class="lead">Find out where movies have been shot in San Francisco. You can filter the view using autocompletion search below.</p>

            <p><a class="" href="<?=\yii\helpers\Url::toRoute('/site/about')?>"><strong>learn more about this project ></strong></a></p>

        </div>
    </div>

    <div class="container">

        <a href="#/list"><i class="glyphicon glyphicon-list"></i> List View</a>
        |
        <a href="#/map"><i class="glyphicon glyphicon-globe"></i> Map View</a>

        <br/>
        <br/>

        <label for="films-select"><i class="glyphicon glyphicon-film"></i>&nbsp;&nbsp;</label>
        <select id="films-select" style="display:none; width: 50%"></select>

        <div class="body-content">
            <img class="spinner" src="https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif" alt="spinner"/>
        </div>
    </div>
</div>
