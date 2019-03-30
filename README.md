
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








