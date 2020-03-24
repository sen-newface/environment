<html>
  <body>
    <?php
    if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') !== false) {
    ?>
    <h3>あなたはChromeを使用しています</h3>
    <?php
    } else {
    ?>
    <h3>あなたはChromeを使用していません</h3>
    <?php
    }
    ?>
  </body>
</html>
