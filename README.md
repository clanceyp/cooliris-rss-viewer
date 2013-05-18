## Cooliris RSS viewer

This extension uses the legacy flash cooliris.swf file hosted by the cooliris team.

For this extension to work your site will need;

* a crossdomain.xml
* a thumbnail.rss


### Crossdomain xml

Your crossdomain.xml should be in the root of your website e.g. http://www.mysite.com/crossdomain.xml. and look like this...

```xml
<?xml version="1.0"?>
<!DOCTYPE cross-domain-policy SYSTEM
"http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">
<cross-domain-policy>
  <allow-access-from domain="*.cooliris.com" secure="false" />
</cross-domain-policy>
```

for more information see [http://www.cooliris.com/developer/reference/media-rss/] and [http://www.adobe.com/devnet/articles/crossdomain_policy_file_spec.html]

### Thumbnail RSS

see [http://www.cooliris.com/developer/reference/media-rss/] and the feed validator [http://feedvalidator.org/]




### More info

Please see the express builder at cooliris.com

[http://www.cooliris.com/yoursite/express/]


### License

Link Audit is released under the MIT license.

www.opensource.org/licenses/MIT

Thank you : )