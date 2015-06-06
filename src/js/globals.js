window.verbose = true;
window.dev = true;
window.plierpoint=1;
window.plierpoly=9999;
window.plierline=999;
window.solrhost = "http://localhost:8983/solr/";
// window.solrhost = "http://solr-lbones.rhcloud.com/";

window.octo = new Octokat({token:"b5824e01cc47d80450bed56564d09a7a2ba7656f"});

window.octocb = function(err,val){};

// octo.zen.read(octocb);
// octo.repos('cecois','bitmap').fetch(octocb);