import requests
url = 'http://localhost:4000/api/upload'
files = {'file': open('test_uploads/test_upload_large.csv','rb')}
print('Posting to', url)
r = requests.post(url, files=files)
print('Status:', r.status_code)
print('Response:', r.text)
