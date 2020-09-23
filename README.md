# GitHub action - FTP Deploy

Deploy your build to any FTP server.

## Example

``` yml
- name: 'Deploy to UAT'
  uses: kemalturk/ftp-deploy@v2
  with:
    server: 127.0.0.1
    user: my-ftp-user
    password: ${{ secrets.FTP_PASSWORD }}
    localRoot: web/dist
    remoteRoot: /
```