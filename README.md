## JWT authorization with Node.js
#### By: Yodahea Daniel
##### 1) Project Description
##### 2) Technologies Used
##### 3) Testing project using Postman



### Project Description
- This project is a NodeJS app with protect API routes using JSON Web Tokens, JWTs. 
- The user will login in with credentials then receive a JWT token for authorization.
- Only with the specific token, the user will have access to data coming from an external API (MockApi.io).

### Technologies Used

##### JSON Web Token (JWT)
- A JWT is a tool used to secure transmission of information between parties.
- JWT's are like 'secret keys', but are actually JSON objects that are digitally 'signed'.
- Therefore with JWT authentication, information that is passed can be verified and trusted.

- A JWT contains a: Header, Payload, and Signature.
- Here is a diagram of how JWT communication functions:

![Myimage](/images/JWT_Comm.jpg)


##### ExpressJS
- Used for creating api routes. 

##### Bcrypt.js
- This library has a useful 'hash()' function is create a secure hash of the user's password. 

### Testing the Project using Postman

- Register user information to the endpoint '/api/register' using POST.
![JWTEx1](/images/Step1_JWT.jpg)

- After registration, get JWT data by POST-ing again with correct user credentials (email and password) to the '/api/login' endpoint.
![JWTEx2](/images/Step2_JWT.jpg)

- Then, add JWT data to the Header as 'Authorization' and it is now we can send a JWT authorized GET request to '/api/users'.
![JWTEx3](/images/Step3_JWT.jpg)

Here is the MockAPI.io API data contents:
![Mockapi](/images/MockAPI_Contents.jpg)