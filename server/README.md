# Workflow 

## Verify Email
- user sign up
- server creates `verificationCode` and store in db 
- server sends verify email with `verificationCode` to user
- user inputs the `verificationCode` then send request to server to `/verify-email`
- server compares with db, clean the `verificationCode` in DB, and response back to client

## Forgot Password
- user clicks `forgot password` button
- server sends email to user with the url that links to `http:localhost:3000/reset-password/:resetToken`
- user clicks on that link -> enter new password -> submit 
- client sends new password to server 
- server updates new password
- server sends back success email

