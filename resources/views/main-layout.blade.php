<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

        <title>BookWorm</title>

        <!-- Google font -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet">

        <!-- Bootstrap -->
        <!-- slick -->
        <!-- Font Awesome Icon -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <!-- Custom stlylesheet -->
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">

        <!-- jQuery Plugins -->

    </head>
    <body>
        

        

        @section('content')
        @show

        

        <!-- FOOTER -->
        <footer id="footer">
            <!-- top footer -->
            <div class="section">
                <!-- container -->
                <div class="container">
                    <!-- row -->
                    <div class="row">
                        <div class="col-md-6 col-xs-6">
                            <div class="footer">
                                <ul class="footer-links">
                                    <li><a href="#"><i class="fa fa-map-marker"></i>441/21 Le Van Luong Road</a></li>
                                    <li><a href="#"><i class="fa fa-phone"></i>+039-42-73-773</a></li>
                                    <li><a href="#"><i class="fa fa-envelope-o"></i>hary.ken223@email.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="clearfix visible-xs"></div>
                    </div>
                    <!-- /row -->
                </div>
                <!-- /container -->
            </div>
            <!-- /top footer -->
            <!-- bottom footer -->
            <div id="bottom-footer" class="section">
                <div class="container">
                    <!-- row -->
                    <div class="row">
                        <div class="col-md-12 text-center">
                                        <span class="copyright">
                                            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                                            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://www.facebook.com/hary.ken.1555/" target="_blank" style="color: azure;">DuyLinh</a>
                                            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                                        </span>
                        </div>
                    </div>
                    <!-- /row -->
                </div>
                <!-- /container -->
            </div>
            <!-- /bottom footer -->
        </footer>
        <!-- /FOOTER -->
        <script src="{{asset('js/app.js')}}" ></script>
            

    </body>
</html>
