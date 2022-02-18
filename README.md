************************************************************************************************************************************

Hello my name is James

This repository holds files that primarily demonstrating HTML design, API routing, database interactions, and MVC modelling through
a web application.

The web application consits of 3 html files and 1 navbar. The index.html (About Me) file and services.html are both static 
pages that provide a breif description about myself and my programming experience. While, the projects.html is a dynamic 
page outlines projects and applications I have made signifcant contributions towards throughout my university journey.

A db folder was created to house a javascript file that is used to connect to MongoDB, allowing communication between the
web application and the database.

Three folders were created in the public folder components, routers, and services. Components includes a html file that is called 
within each html file responsible for the main UI, displaying a horizontal navbar. Routers includes javascript files that declare
appropraite routes used to get and post project and student data. Whereas, the Services folder a file that provides the 
functinality to the project routes.

                               ________________________________________________

This web applications succesfully runs by using express, Nodejs, MongoDb. Despite the dependancy list in the package.json
file, body-parser, and cors are not required. Lastly, nodemon is only required when runing as a developer.


