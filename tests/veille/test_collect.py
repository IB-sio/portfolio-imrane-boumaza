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
 def test_scope(self):
  self.assertIsNone(c.classify('[MàJ] Multiples vulnérabilités dans Ivanti Connect Secure (ICS)'))
  self.assertIsNone(c.classify('Vulnérabilité dans Fortinet FortiOS (gateway VPN)'))
  self.assertIsNone(c.classify('Mise à jour de firmware UEFI pour PC portables'))
  self.assertEqual(c.classify('Botnet exploiting TP-Link routers and IP cameras'),'incident')
  self.assertEqual(c.classify('Multiples vulnérabilités dans les produits Synology'),'vulnerability')
  self.assertEqual(c.classify('Multiples vulnérabilités dans les caméras Hikvision'),'vulnerability')
  self.assertEqual(c.classify('Smart TV boxes used in DDoS botnet'),'incident')
  self.assertIsNone(c.classify('Vulnérabilité dans Microsoft Office'))
  self.assertIsNone(c.dateparse('Mon, 16 Nov 0007 00:00:00 GMT'))
 def test_ai_off_topic(self):
  raw=json.dumps({'candidates':[{'content':{'parts':[{'text':json.dumps({'relevant':False})}]}}]}).encode()
  with patch.object(c,'get',return_value=raw):
   self.assertIsNone(c.synthesize({'original_title':'VPN','excerpt':'Example'},{'model':'test'},'test'))
 def test_device(self):
  obj={l:dict(title='Title',summary='Summary',analysis='Check source',device='IP cameras') for l in c.LANGS}
  raw=json.dumps({'candidates':[{'content':{'parts':[{'text':json.dumps(obj)}]}}]}).encode()
  with patch.object(c,'get',return_value=raw):
   self.assertEqual(c.synthesize({'original_title':'IoT','excerpt':'Example'},{'model':'test'},'test')['fr']['device'],'IP cameras')
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
  cfg=json.loads((c.ROOT/'scripts/veille/config.json').read_text());allowed=set(cfg['reference_domains'])
  for f in cfg['feeds']:allowed.update(f['domains'])
  data=json.loads(c.OUT.read_text());ids=[a['id'] for a in data['items']];self.assertEqual(len(ids),len(set(ids)))
  for a in data['items']:
   self.assertIn(c.urllib.parse.urlsplit(a['url']).hostname,allowed)
   if a['kind']!='feed':self.assertEqual(set(a['translations']),set(c.LANGS))
if __name__=='__main__':unittest.main()
