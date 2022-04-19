## Register / Login Procedure : 


Register : 
    
    1. FE will display the input fields that you want to capture from the user. Name, age, salary, dept, email, password etc.
    2. User will be providing the details in the fields, then he will click on submit button or register/ signup button. 
    3. FE will verify if all the fields are properly filled and correct. - Validating input fields : Regex regex101.com (Form Validation)
    4. FE will be having an API call which will pass this complete data in API to the backend.
    5. Validate email if it is already present or not. Now its time to store the details in DB. ENCRYPTION :Information like passwords should not be stored in the db directly. So we will encrypt the password and then only store it . So this encryption code will be written in controllers 
    6. There is a library known as bcrypt npm : any text will be converted into a hash value .
    7. Once the bcrypt has returned you hashed value, then we will store that in DB along with other user details. 
 

har   : NORMAL TEXT
h2345678912#$%^&*9aTYGHBSJN@#$%^&*(0R)      : HASHED VALUE



Login : 

    1. FE will take data from user , email/username and password
    2. Click on login button, then FE will call an API from backend and will pass email and password to it.
    3. APIs comes up with different types of error messages, 
        like if email and password is not provided then msg would be "Please provided required details", 
        if email is not already present in database , then msg would be : "Given email is not registered, Please register".
        Password's hashed value will be created once again and then it will compare it with the one saved in DB. if it returns then home page if not then error msg will be : "Your password is incorrect, please try with correct password."
    4. BE /login api will provide the token to the frontend. this token will be generated using library named - jsonwebtoken . 
    5. After receiving this token from BE , FE will store this token in the local storage. and the whatever next api calls has to be made , this token will be passed in the Headers. inside authorization field concatenated with Bearer and then token.
    6. IRCTC Applications : Token Expiration 



/login - it will give you token , it will say that it should expire in 5 mins.
/contact - after 4 mins - this api user is trying to access by passing token , at this time he will get the response as well from BE.
/user - after 5 mins - since the token will be expired by now. so the error will be sent to FE, now FE responsiblity would be to send the user back to login page is such error occurs. error msg would be : Session has expired, please re-login.


Authentication : 
Authorization : Role Based access 

Authentication is used to authenticate someone's identity, whereas authorization is a way to provide permission to someone to access a particular resource.

Authentication is the log in and authorization is the permissions.

authentication validates that users are who they claim to be. Usually with a username and password, (401 status code for unAuthentication)                                                      Authorization checks, whether that user has permission to access aspecific resource once they've been authenticated sometimes called access control because it controls which resources in the server the current user has access to. (403 status code forbidden)

