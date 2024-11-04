from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('trail',views.test,name='trail1'),
    path('trail1',views.test1,name='trail1'),
    path('products',views.test2,name='products'),
    path('createProduct', views.createProduct, name='createProduct'),
    path('index2',views.test3,name='index2'),
    path('loader',views.loader,name='Loader'),
    path('admin',views.admin,name='Admin'),
    path('trailnav',views.trailnav,name='trailnav'),
    path('dashboard',views.dashboard,name='dashboard'),
    path('admindashboard',views.admindashboard,name='admindashboard'),
    path('salesdashboard',views.salesdashboard,name='salesdashboard'),
    path('lowStocks',views.lowStocks,name='lowStocks'),
    path('outofstocks', views.outofStocks, name='outofstocks'),
    path('category', views.category, name='Category'),
     path('subcategory', views.subcategory, name='subCategory'),
    #getAllProducts
    path('getallproducts', views.getAllProducts, name='getallproducts'),
    #getProductUsingTheirid
    path('getproduct/<int:id>/',views.filterProduct,name='getProduct'),
    #addNewProduct
    path('addnewproduct',views.addNewProduct,name='addnewproduct'),
    #updateProduct
    path('updateproduct/<int:id>/',views.updateProduct,name='updateproduct'),
    #deleteProduct
    path('deleteproduct/<int:id>/',views.deleteProduct,name='deleteproduct'),
    #purchase a product
    path('pruchaseproduct',views.purcahseProduct, name='purchaseproduct'),
    #get all gst
    path('getAllGst', views.getAllGst, name='get_all_gst'),  # Add this line
    #get all shops
    path('getAllShops', getAllShops, name='get_all_shops'),   
    #add new gst
    path('addnewgst', addNewGst, name='add_new_gst'), 
    #add new shop
    path('addnewshop', addNewShop, name='add_new_shop'),

]



