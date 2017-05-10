# BAMazon :boom:
#### :dragon: *BAMazon offers the widest variety and best prices on magical creature adoptions* :dragon:

## CONTENTS
[:moneybag: Customer View](#customer)

[:clipboard: Manager View](#manager)

[:briefcase: Supervisor View](#supervisor)

___
## Customer View :moneybag: <a name="customer"></a>
**The customer gets a list of options**

![customer menu](https://cloud.githubusercontent.com/assets/21952950/25815888/4977fd20-33f0-11e7-8967-09c2571f0354.png)

**If the customer chooses:**
See all available magical pets

![screen shot 2017-05-08 at 1 26 35 pm](https://cloud.githubusercontent.com/assets/21952950/25816413/099529c4-33f2-11e7-99ec-2bf364993b3e.png)

**If the customer chooses:**
I'm ready to adopt one or more magical pets
![ready to adopt](https://cloud.githubusercontent.com/assets/21952950/25816497/43cd3316-33f2-11e7-9636-e123eff295d4.png)
* BUT the customer's product id does not exist
![id does not exist](https://cloud.githubusercontent.com/assets/21952950/25816581/82c23a1c-33f2-11e7-853c-a68123140063.png)
* BUT the customer's desired quantity exceeds available stock
![exceed stock](https://cloud.githubusercontent.com/assets/21952950/25816654/bcda04a0-33f2-11e7-8fcf-6bf82415690d.png)

**If the customer chooses:**
I have enough magic in my life, I'd like to exit
* Connection to database is terminated


___
## Manager View :clipboard: <a name="manager"></a>
**The manager gets a list of options**

![manager menu](https://cloud.githubusercontent.com/assets/21952950/25819919/82c461f6-33fd-11e7-8d49-b218265ef74e.png)

**If the manager chooses:**
View products on sale
* They get a list of all products with IDs, prices and number in stock

![view products](https://cloud.githubusercontent.com/assets/21952950/25819968/a8a69bc8-33fd-11e7-8b7d-0e82c2bc342b.png)

**If the manager chooses:**
View low inventory
* They get a list of products with less than 5 in stock

![low inventory](https://cloud.githubusercontent.com/assets/21952950/25820032/e0d4cf56-33fd-11e7-9f35-c54c9cad050a.png)

**If the manager chooses:**
Add to inventory
* They get a list of existing products they can add to

![add inventory 1](https://cloud.githubusercontent.com/assets/21952950/25820080/133543c2-33fe-11e7-9b43-28bf7f00412f.png)
* Then they can input how many items they want to add and see the new stock quantity

![stock updated](https://cloud.githubusercontent.com/assets/21952950/25821557/93583be0-3403-11e7-8058-bccfb687adf0.png)

**If the manager chooses:**
Add a new product
* They type in the name of the new product(this is validated against existing products to make sure it is not already in the database)
* They choose the department from a list
* They input a price and a quantity of items (these are both validated as numbers greater than 0)

![add a new product](https://cloud.githubusercontent.com/assets/21952950/25821828/96990c34-3404-11e7-99c4-e3bf5fe5adc1.png)

**If the manager chooses:**
Delete a product
* This is a useful function if the manager added too many new products while testing the system!

![Delete product](https://cloud.githubusercontent.com/assets/21952950/25821906/d43378ea-3404-11e7-8135-0583fd29a0e8.png)

**If the manager chooses:**
Exit
* Connection to database is terminated

---
## Supervisor View :briefcase: <a name="supervisor"></a>
**The supervisor gets a list of options**

![supervisor menu](https://cloud.githubusercontent.com/assets/21952950/25902502/b443f30c-3567-11e7-98ed-6e22af042ff9.png)

**If the supervisor chooses:**
View product sales by department

![view sales](https://cloud.githubusercontent.com/assets/21952950/25902550/dc578246-3567-11e7-8d36-d25562adb9fa.png)

**If the supervisor chooses:**
Create a new department
* They type in the name of the new department (this is validated against existing departments to make sure it does not already exist)
* They type in the overhead cost of the new department (this is validated as a number greater than 0)
![add department](https://cloud.githubusercontent.com/assets/21952950/25904144/5352014c-356c-11e7-8b3a-e4168049731a.png)
* The manager can now add products to the new department
![add product to department](https://cloud.githubusercontent.com/assets/21952950/25904200/87b83a50-356c-11e7-86c5-612fc1e12002.png)

**If the supervisor chooses:**
Delete a department
* They can choose from a list of existing departments

![delete department](https://cloud.githubusercontent.com/assets/21952950/25904643/d1d8c9d2-356d-11e7-849a-5c1988fc5f18.png)

**If the supervisor chooses:**
Exit
* Connection to database is terminated









