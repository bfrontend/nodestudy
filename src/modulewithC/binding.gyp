{
  'targets': [
    {
      'target_name': 'hello',
      'sources': [
        './hello.cc'
      ],
      'conditions': [
        [
          'OS == "win"',
          {
            'libraries': ['-lnode.lib']
          }
        ]
      ]
    }
  ]
}