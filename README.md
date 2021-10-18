# Tymora

The Goddess of Good Fortune, otherwise known as Lady Luck. Feeling lucky? Take a roll with her dice, they only decide fate itself!

Tymora is a Discord bot for dice rolling, aptly named after the goddess from the Forgotten Realms.

## Development environment setup

### Prerequisites

- Docker
- Docker Compose
- Setup an application in the [Discord Developer Portal](https://discord.com/developers/applications)

### Setup

1. Clone the repo

```bash
# Use this command for https
$ git clone https://github.com/xhudaman/discord-dice-roller-bot.git

# Use this command for ssh
$ git clone git@github.com:xhudaman/discord-dice-roller-bot.git
```

2. Navigate into the project directory and run the following to get a terminal in the container:

```bash
$ docker-compose run bot sh
```

3. Inside the container's terminal run the following to install dependencies:

```bash
$ yarn install
```

4. Exit the container's shell

```bash
$ exit
```

5. Run `docker-compose up` to start the dev server.

> After intial setup only step 5 is required to run the dev server.

## Usage

### Commands

| Command     | Aliases           | Description                                                                                          |
| ----------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| `!r`        | `!roll`           | Rolls dice. It's case insensitive so `!Roll`, `!R`, or even `!ROLL` will work.                       |
| `!helpdice` | `!h`, `!commands` | Prints out the help dialog explaining what commands are available and how to use them, if necessary. |
| `!src`      | `!source`         | Prints out a link to the source code (this repo) and a list of contributing authors for the project. |

### Rolling

#### Basic Roll

To perform a basic roll use the roll command followed by the dice you want to roll.

```
!r 1d20
```

In this scenario the number `1` in `1d20` indicates the amount of dice. The `d` indicates that the following number is the number of faces the desired dice have. In this case the dice to be rolled are 20 sided dice as noted `d20`.

> Both the amount of dice and the number of faces on dice can be anywhere from `1-999`.

#### Rolling with a Modifier

To roll with a modifier simply add whatever the modifier is onto the command, like so: `!r 1d20 + 2`. In this example after rolling a 20 sided die `2` would be added to the total. So if my roll was `10`, the modifier would be added for a total of `12`.
