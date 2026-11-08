# Builds the site's script files: splits src/app.js into ~8 KB pieces (js/1.js, js/2.js, ...) at top-level
# statement boundaries and updates the ?v= cache-busting versions in index.html.
# Run from the repo root after editing src/app.js, app.css, swipe.js or swipe.css:  python3 tools/split.py
import hashlib,os,re
d=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')+'/'
t=open(d+'src/app.js',encoding='utf-8').read()
lines=t.split('\n')[:-1]
chunks=[];cur=[];size=0
for ln in lines:
    top=ln and not ln[0].isspace() and ln[0] not in '}])'
    if top and size>7000 and not cur[-1].startswith('//'):
        chunks.append(cur);cur=[];size=0
    cur.append(ln);size+=len(ln.encode())+1
chunks.append(cur)
os.makedirs(d+'js',exist_ok=True)
for f in os.listdir(d+'js'):os.remove(d+'js/'+f)
tags=[]
for i,c in enumerate(chunks):
    b=('\n'.join(c)+'\n').encode()
    n='js/%d.js'%(i+1);open(d+n,'wb').write(b)
    tags.append('<script src="/%s?v=%s"></script>'%(n,hashlib.sha1(b).hexdigest()[:8]))
h=open(d+'index.html',encoding='utf-8').read()
h=re.sub(r'(<script src="/js/\d+\.js\?v=\w+"></script>\n)+','\n'.join(tags)+'\n',h)
for x in ['app.css','swipe.js','swipe.css','avatar.js','account.js']:
    v=hashlib.sha1(open(d+x,'rb').read()).hexdigest()[:8];h=re.sub(r'/'+re.escape(x)+r'\?v=\w+','/'+x+'?v='+v,h)
open(d+'index.html','w',encoding='utf-8').write(h)
print(len(chunks),'script files written')
