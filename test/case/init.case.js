//in
[
    "INIT",
    "STATUS",
    "touch tmp/1",
    "STATUS",
    "mkdir tmp/sub",
    "touch tmp/sub/2",
    "STATUS"
]
//out
{"modified":[],"added":[],"deleted":[]}
{"modified":[],"added":["1"],"deleted":[]}
{"modified":[],"added":["1","sub/"],"deleted":[]}