## Development Tool

- Neon SQL Database
- VSCode
- Node.js
- Rest Client Extension


### Neon Postgres Database
http://neon.tech is a PostgeSQL database as an online service. Neon offers a free plan for development projects.

1. **Sign Up for Neon**: Goto https://neon.tech and sign up with a gmail id.
2. **Create a Project**: Once logged in, navigate to the dashboard and create a new project.
3. **Create a Database**: In your project, create a new database named "e-store".
4. **Connection**: Navigate to the dashboard to get connection information (.env), read more in [Connect Documentation](https://neon.tech/docs/connect/connect-from-any-app) 

The environment (.env) looks as below 
```
PGUSER=alex 
PGHOST=ep-cool-darkness-123456.us-east-2.aws.neon.tech 
PGDATABASE=dbname 
PGPASSWORD=AbC123dEf 
PGPORT=5432
```

### Installing Visual Studio Code (VSCode)
Visual Studio Code is a free, open-source editor made by Microsoft that supports JavaScript, TypeScript, and a wide range of other programming languages and frameworks.

1. Go to the VSCode website https://code.visualstudio.com
2. Download the installer for your operating system.
3. Run the installer and follow the installation prompts.


### Installing Node.js
Node.js is a runtime that allows you to run JavaScript on the server-side. npm, Node.js' package manager, comes bundled with Node.js installations.
1. Visit the Node.js website https://nodejs.org/
2. Download the LTS version recommended for most users.
3. Run the installer and follow the instructions to install Node.js and npm.

### Installing the Rest Client Extension
The REST Client extension is a powerful tool for testing APIs directly from your editor, making it easier to develop and test back-end applications or integrate with external services.

For a visual overview of installation and usage view the following youtube presentation
[Youtube: Rest Client Usage](https://www.youtube.com/watch?v=dSmCYMCJynk)
#### Installation Steps
1. **Open Visual Studio Code**: Launch the Visual Studio Code application on your computer.
    
2. **Access the Extensions View**: You can access the Extensions view by clicking on the square icon on the sidebar located on the left side of the window. Alternatively, you can press `Ctrl+Shift+X` on Windows and Linux, or `Cmd+Shift+X` on macOS, to open the Extensions view directly.
    
3. **Search for REST Client**: In the Extensions view search box, type `REST Client`. Look for the extension named "REST Client" by Huachao Mao. You can identify it by its description, which usually mentions its ability to send HTTP request and view the response in Visual Studio Code directly.
    
4. **Install the Extension**: Click on the "Install" button associated with the REST Client extension in the search results. The installation should complete in a few seconds, depending on your internet connection speed.
    
5. **Verify Installation**: Once installed, you don't need to reload or restart VSCode; the REST Client extension is ready to use immediately. You can verify the installation by opening or creating a new file with a `.http` or `.rest` extension and writing an HTTP request. The REST Client extension will recognize the format and allow you to send the request directly from VSCode.
example
```
### GET one Employee
GET http://:3000/employees/100000
```