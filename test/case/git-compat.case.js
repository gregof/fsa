//in
[
    "mkdir tmp",
    "touch tmp/1",
    "INIT",
    "git init tmp",
    "STATUS",
    "COMMIT",
    "STATUS",
    "mkdir tmp/sub",
    "touch tmp/sub/2",
    "git init tmp/sub",
    "STATUS",
    "COMMIT",
    "STATUS",
    "rm -rf tmp"
]
//out
{"modified":[],"added":["1"],"deleted":[]}
{"modified":[],"added":[],"deleted":[]}
{"modified":[],"added":["sub/"],"deleted":[]}
{"modified":[],"added":[],"deleted":[]}