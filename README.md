
# muxrpc-usage

nice helpful usage messages for muxrpc

## data structure

muxrpc commands need to return a data structure describing their commands and options.
`muxrpc-usage` can then render it into helpful commands.

{
  <group>: {
    type: 'group'
    commands: {
      <group|command>,...
    },
    description: text,
  },
  <command>: {
    type: 'source' | 'sink' | 'async' | 'sync',
    arguments: {
      <arg>: {
        optional: boolean,
        test: function|regexp|typeof,
        decription: <text>
    },
    argument: {
      optional: false,
      test: function|regexp|typeof,
      decription: <text>
    }
    description: <text>
  }

}








