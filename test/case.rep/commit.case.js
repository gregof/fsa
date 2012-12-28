//in
[
    "touch tmp/1",
    "INIT",
    "STATUS",
    "ADD",
    "COMMIT",
    "STATUS",
    "mkdir tmp/sub",
    "touch tmp/sub/2",
    "STATUS",
    "ADD",
    "COMMIT",
    "STATUS",
    "touch tmp/sub/3",
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
{"modified":[],"added":["sub/3"],"deleted":[]}
{"modified":[],"added":[],"deleted":[]}