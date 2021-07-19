@extends('main-layout')

@section('content')
<div class="section">
    <div class="container">
        <div class="row">

            <div class="col-md-12 ">
                <div class="section-title">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-9">
                                <h3 class="title">On sale</h3>
                            </div>
                            <div class="col-md-3">
                                <button class="btn-danger" style="float: right; display: inline;">View all ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        <div id="root"></div>

        <!-- SECTION -->
        <div class="section">
            <!-- container -->
            <div class="container">
            <!-- store products -->
            <div id="store" class="col-md-12 ">
                    <!-- row -->
                    <div class="row">
                        <!-- Product tab -->
                        <div class="col-md-12">
                            <div id="product-tab">
                                <!-- product tab nav -->
                                <ul class="tab-nav">
                                    <div class="section-title">
                                        <h3 class="title">Featured books</h3>
                                    </div>
                                    <li class="active"><a data-toggle="tab" href="#tab1">Recommended</a></li>
                                    <li><a data-toggle="tab" href="#tab3">Popular</a></li>
                                </ul>
                                <!-- /product tab nav -->
                            </div>
                            <!-- product tab content -->
                            <div class="tab-content ">
                                <!-- tab1  -->
                                <div id="tab1" class="tab-pane fade in active">
                                    <div class="col-md-12 book-border">
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book kkkkkk goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                    </div>
                                </div>
                                <!-- /tab1  -->

                                <!-- tab3  -->
                                <div id="tab3" class="tab-pane fade in">
                                    <div class="col-md-12 book-border">
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                        <!-- product -->
                                        <div class="col-md-3 col-xs-6">
                                            <div class="product">
                                                <div class="product-img">
                                                    <img src="./img/book6.jpg" alt="">
                                                </div>
                                                <div class="product-body">
                                                    <h3 class="product-name"><a href="#">Book name goes here</a></h3>
                                                    <p class="author-name">Author</p>
                                                    <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                                                </div>
                                                <div class="add-to-cart">
                                                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>View</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /product -->
                                    </div>
                                </div>
                                <!-- /tab3  -->
                                </div>
                            <!-- /product tab content  -->
                        </div>
                        <!-- /product tab -->
                    </div>
                    <!-- /store products -->
            </div>
                <!-- /row -->
            </div>
            <!-- /container -->
        </div>
        <!-- /SECTION -->
@endsection
