// window.octo = new Octokat({token:"b5824e01cc47d80450bed56564d09a7a2ba7656f"});
// window.octo = new Octokat({token:"539070395ca3ceab1219717a166ec2a66edb8eac"});
window.octo = new Octokat({token:"2007762049fae89c7856fc296d994f431f74d7cd"});

window.octocb = function(err,val){};

octo.zen.read(octocb);
octo.repos('cecois','bitmap').fetch(octocb);