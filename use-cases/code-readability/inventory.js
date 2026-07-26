function p(i, a, q) {
  let r = [];
  let t = 0;

  for (let j = 0; j < i.length; j++) {
    let c = i[j];
    let f = false;

    for (let k = 0; k < a.length; k++) {
      if (c.id === a[k].id) {
        f = true;

        if (a[k].q >= q) {
          r.push(c);
          t += c.p * q;
          a[k].q -= q;
        }

        break;
      }
    }

    if (!f) {
      console.log("Item " + c.id + " not available");
    }
  }

  return {
    s: r,
    t: t
  };
}

module.exports = { p };