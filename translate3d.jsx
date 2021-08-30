<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <style>
  
  .base{
  width:200px;
  height:150px;
  background:grey;

  }
  .box{
  width:200px;
  height:150px;
  background:red;
  /*transform:rotateX(60deg)
  transform:perspective(800px) rotateX(70deg);
  transform:perspective(800px) rotateY(80deg);
  transform:rotateZ(30deg);
  transform:perspective(800px) rotateY(60deg) translateX(100px);
  transform:perspective(800px) rotateY(60deg) translateZ(100px);*/
  transform:perspective(800px) rotateY(60deg) translate3d(50px,50px,40px);
  }
  
  .box:hover{
  
  }
  

  </style>
</head>
<body>

<div class="jumbotron text-center">
  <h1>My First Bootstrap Page</h1>
  <p>Resize this responsive page to see the effect!</p> 
</div>
  
<div class="container">
<div class="base">
  <div class="box">
  <h6>Hello</h6>
  </div>
  </div>
 
</div>

</body>
</html>
