# Bake This Cake
[**https://bake-this-cake.herokuapp.com**](https://bake-this-cake.herokuapp.com/)


## Setup:

1. Download Docker CE/EE 18.06+ for your system and install it. Run Docker Desktop.

2. Download VS Code and install it. Open it up and install the extension pack [**Remote Development**](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) by Microsoft.

    - **If you're running Windows:** Do steps 2a and 2b.

    - **If you're running macOS:** Do only step 2a.

    - **If you're running Linux:** Do step 2c.
    
    **2a.** Right-click on the Docker task bar item and update **Settings / Preferences -> Shared Drives / File Sharing** with any source code locations where you intend on saving BakeThisCake.
    
    **2b.** Windows search for **Local Security Policy**. Click on **Network List Manager Policies**. Double click unidentified Networks then change the location type to private. Restart Docker.

    **2c.** 
    Follow the [Docker Compose 1.21+ install directions](https://docs.docker.com/compose/install/).
    Add your user to the docker group by using a terminal to run: ``` sudo usermod -aG docker $USER``` Sign out and back in again so this setting takes effect. [(Source Article)](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

3. Generate an ssh key for yourself with ```ssh-keygen```. Add the generated `id_rsa.pub` to Github. Download the BakeThisCake: ```git clone git@github.com:remixie/BakeThisCake.git```.

4. Open the root directory of this project in VSCode. Click **View -> Command Palette...**
Search for **Remote-Containers: Open Folder in Container...** and click it.

5. Let Docker do its thing and if you did everything right, you should be able to see the Vue CLI gui at ```http://localhost:8000``` in your web browser. If you run into issues or errors, **reach out to the team.**

6.  Click **Import -> Import this folder**. Go to **Tasks** and run **db:seed**, **dev** and **serve** in that order.

7. Open ```http://localhost:8080``` to see BakeThisCake in all its cakey glory.

---
## Important Development Notes:
- When you save an edit to BakeThisCake's source code, inside of a VS Code Dev Container, the edits are saved on the docker container ***and* on your local machine.**

- If you need to make edits to your docker files, remove all your images, containers and networks that contain "bakethiscake". Remove your inactive volumes as well. This is easy to do if you have the [Docker Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker). Removing all this docker stuff *before* running a new bakethiscake docker container will prevent headaches in the long run, trust me.

- `git push` does not work inside of a VS Code Dev Container terminal. Please `git push` from your local machine terminal instead.