//in
[
    "mkdir tmp",
    "INIT",
    "STATUS",
    "touch tmp/1",
    "STATUS",
    "mkdir tmp/sub",
    "touch tmp/sub/2",
    "STATUS",
    "rm -rf tmp"
]
//out
{"modified":[],"added":[],"deleted":[]}
{"modified":[],"added":["1"],"deleted":[]}
{"modified":[],"added":["1","sub/"],"deleted":[]}