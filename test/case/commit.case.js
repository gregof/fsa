//in
[
    "touch tmp/1",
    "INIT",
    "STATUS",
    "COMMIT",
    "STATUS",
    "mkdir tmp/sub",
    "touch tmp/sub/2",
    "STATUS",
    "COMMIT",
    "STATUS",
    "touch tmp/sub/3",
    "STATUS",
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