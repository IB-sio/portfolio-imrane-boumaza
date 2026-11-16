import unittest,sys,json
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'scripts/veille'))
import collect as c
class WatchTests(unittest.TestCase):
 def test_categories(self):
  self.assertEqual(c.classify('IoT botnet attack'),'incident')
  self.assertEqual(c.classify('Vulnérabilité Synology'),'vulnerability')
  self.assertIsNone(c.classify('Cybercrime financial fraud'))
 def test_xml(self):
  with self.assertRaises(ValueError):c.parse(b'<!DOCTYPE x><rss/>',{})
 def test_untrusted_link(self):
  raw=b'<rss><channel><item><title>IoT botnet</title><link>https://untrusted.test/a</link><pubDate>Mon, 16 Nov 2026 00:00:00 GMT</pubDate></item></channel></rss>'
  self.assertEqual(c.parse(raw,{'name':'test','domains':['cert.cyber.gouv.fr']}),[])
 def test_ai_output(self):
  obj={l:dict(title='Title',summary='<img src=x>',analysis='Check source') for l in c.LANGS}
  raw=json.dumps({'candidates':[{'content':{'parts':[{'text':json.dumps(obj)}]}}]}).encode()
  with patch.object(c,'get',return_value=raw):
   with self.assertRaises(ValueError):c.synthesize({'original_title':'IoT','excerpt':'Example'}, {'model':'test'},'test')
 def test_dataset(self):
  data=json.loads(c.OUT.read_text());ids=[a['id'] for a in data['items']];self.assertEqual(len(ids),len(set(ids)))
  for a in data['items']:
   self.assertIn(c.urllib.parse.urlsplit(a['url']).hostname,['cert.cyber.gouv.fr','www.cert.ssi.gouv.fr','cert.ssi.gouv.fr','www.justice.gov','justice.gov','digital-strategy.ec.europa.eu'])
   if a['kind']!='feed':self.assertEqual(set(a['translations']),set(c.LANGS))
if __name__=='__main__':unittest.main()
