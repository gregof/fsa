//in
[
    "touch tmp/1",
    "INIT",
    "git init tmp",
    "STATUS",
    "ADD",
    "COMMIT",
    "STATUS",
    "mkdir tmp/sub",
    "touch tmp/sub/2",
    "git init tmp/sub",
    "STATUS",
    "ADD",
    "COMMIT",
    "STATUS"
]
//out
{"modified":[],"added":["1"],"deleted":[]}
{"modified":[],"added":[],"deleted":[]}
{"modified":[],"added":["sub/"],"deleted":[]}
{"modified":[],"added":[],"deleted":[]}