
# muxrpc-usage

nice helpful usage messages for muxrpc

## data structure

muxrpc commands need to return a data structure describing their commands and options.
`muxrpc-usage` can then render it into helpful commands.

``` js
{
  description: description_of_app,
  commands: {
    <Group>: {
      description: description_of_group,
      commands: {
        <name>: <subgroup|command>,...
      }
    },
    <Command>: {
      type: 'source' | 'sink' | 'async' | 'sync', //muxrpc call type
      description: <text> //description of command
      args: {
        <arg>: {
          type: name_of_type,
          optional: boolean,
          decription: <text>
        },...
      },
    }
  }
}
```

It is a tree of `Group`, `Command` and `Option` types. The top level is assumed to be a `Group`.
a `Group` has a `description` (just a string) and a map of `Commands` and sub-`Group`s.
A `Command` has a type (which is always a [`muxrpc`](https://github.com/ssbc/muxrpc) call type),
a `description` and `args`. `Args` is a map of `Option`s. `Option`s have a type
(which is just a string naming that type) a `optional` boolean (defaults to true,
set to false if this option is mandatory) and a description.

## formats

there are various ways to display help text

### quick

list the commands available at a level, to be used as a quick reminder when a user
mistypes a command for example.

```

```


