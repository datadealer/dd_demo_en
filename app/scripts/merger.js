define(function(require) {

  function Merger(jargs) {

    var self = this;

    self.AGING = 1.0;
    self.TRASH = 1.0;
    self.UPGRADES = {};
    self.QUALITY = 100;

    self.args = jargs; //JSON.parse(jargs);

    self.merge = function() {
      //print(str(self.db));
      self.db.merge(self.pset);
      //print(str(self.db));
      var out = {
        amount: self.db.number,
        increment: self.db.number - int(self.args.db_amount)
      };
      out.mapping = _.map(_.values(self.db.realFeatures()), function(z) {
        return {type: z.name(), amount: z.share};
      });
      out.dup = int(self.args.profileset_amount - out.increment);
      return out;
    };

    self.compare = function(url, clientData) {
      return
      $.ajax({
        url: url,
        data: self.args,
        type: 'POST',
        cache: false,
        success: function(data) {
          print('Result of client merge routine:');
          print(clientData);
          print('Result of server merge routine:');
          print(data);
        },
        dataType:'json'
      });
    };

    self._extract_types = function(dbmap, profmap) {
      var z = _.pluck(dbmap.concat(profmap), 'type');
      return _.uniq(z);
    };

    _.each(self._extract_types(self.args.db_map, self.args.profileset_map), function(t) {
      var token = FeatureFab.create(t, self.UPGRADES, self.AGING, self.TRASH);
    });
    self.db = new Database(int(self.args.db_amount), 'database', self.QUALITY);

    self.db.maximum = int(self.args.db_max);
    _.each(self.args.db_map, function(t) {
      self.db.__getitem__(t.type).setShare(float(t.amount));
    });
    self.pset = new ProfileSet(float(self.args.profileset_amount), 'profileset', self.QUALITY);
    _.each(self.args.profileset_map, function(t) {
      self.pset.__getitem__(t.type).setShare(float(t.amount));
    });
  }

  var FeatureFab = new function() {
    var cls = this;

    cls.features = [];
    cls.total = 0;

    cls.create = function(name, upgrades, aging, trash) {
      upgrades || (upgrades = {});
      _.isNumber(aging) || (aging = 1);
      _.isNumber(trash) || (trash = 1);

      if (_.indexOf(name, _.pluck(cls.features, name))) {
        var feat = new Feature(name, upgrades, aging, trash);
        cls.features.push(feat);
        cls.total += 1;
        return feat;
      } else {
        // throw Error('Exception: ' + 'Feature already exists');
      }
    };

    cls.setCreateMap = function() {
      return _.map(cls.features, function(f) {
        return [f, 0];
      });
    };
  };

  function Feature(name, upgrades, aging, trash) {
    var self = this;

    self.name = name || null;
    self.upgrades = upgrades || {};
    self.aging = _.isNumber(aging) ? aging : 1;
    self.trash = _.isNumber(trash) ? trash : 1;

    // FIXME: Unused method.
    self.setAging = function(factor) {
      if (factor > 0 && factor <= 1) {
        self.aging = factor;
      }
    };

    // FIXME: Unused method.
    self.addUpgrade = function(feature, factor) {
      self.upgrades[feature.name] = factor;
    };

    // FIXME: Unused method.
    self.getUpgrades = function(features) {
      var dict = {};
      _.each(features, function(feature) {
        if (feature.name in self.upgrades) {
          dict[feature.name] = self.upgrades[feature.name];
        }
      })
      return dict;
    };

    // FIXME: Unused method.
    self.__unicode__ = function() {
      return name;
    };
  }

  function ProfileFeature(feature, share) {
    var self = this;

    self.feature = feature || null;
    self.share = _.isNumber(share) ? share : 0;

    self.setShare = function(share) {
      if (share < 101 && share > -1) {
        self.share = share;
      } else {
        throw Error('ValueError: ' + share);
      }
    };

    $property(self, 'name', function() {
      return self.feature.name;
    });

  }

  function ProfileSet(number, origin_id, quality) {
    var self = this;

    self._pfeatures = {};
    self.upgrade_log = {};
    self.number = _.isNumber(number) ? number : 0;
    self.quality = _.isNumber(quality) ? quality : 0;
    self.origin_id = origin_id || null;

    _.each(FeatureFab.setCreateMap(), function(feat) {
      self._pfeatures[feat[0].name] = new ProfileFeature(feat[0], feat[1]);
    });

    $property(self, 'fill_factor', function() {
      return 1;
    });

    // FIXME: Unused method.
    $property(self, 'size', function() {
      var self = this;
      return self.number;
    });

    // FIXME: Unused method.
    $property(self, 'features', function() {
      var self = this;
      return _.pluck(_.values(self._pfeatures), 'feature');
    });

    $property(self, 'indicator', function() {
      var self = this;
      var tples = _.map(_.values(self._pfeatures), function(x) {
        return [x.share * x.feature.trash, x.feature.trash];
      });
      if (self.number > 0 === false) {
        return float(0);
      }
      var divisor = float(_.reduce(_.map(tples, function(i) {
        return i[1];
      }), function(a, b) {
        return a + b;
      }));
      var indicator = 0;
      if (divisor > 0) {
        var dividend = float(_.reduce(_.map(tples, function(i) {
          return i[0];
        }), function(a, b) {
          return a + b;
        }));
        indicator = (dividend / divisor) * self.fill_factor();
      }
      return indicator;
    });

    self.realFeatures = function() {
      var self = this;
      var dict = {};
      _.each(_.values(self._pfeatures), function(pf) {
        if (pf.share > 0) {
          dict[pf.name()] = pf;
        }
      });
      return dict;
    };

    // FIXME: Unused method.
    self.possibleUpgrades = function() {
      var self = this;
      var dict = {};
      _.each(_.values(self._pfeatures), function(pfeature) {
        dict[pfeature.name()] = pfeature.feature.getUpgrades(self.features);
      });
      return dict;
    };

    // FIXME: Unused method.
    self.getUpgradersFor = function(pfeature) {
      print('*****')
      var self = this;
      var dict = {};
      if (pfeature in _.values(self._pfeatures)) {
        _.each(_.values(self._pfeatures), function(upgrador) {
          if (upgrador.name in _.keys(pfeature.feature.upgrades)) {
            dict[upgrador.name] = pfeature.feature.upgrades[upgrador.name];
          }
        });
      }
      return dict;
    };

    self.__str__ = function() {
      var self = this;
      var out;
      out  = '-----------------------------\n';
      out += "  " + self.origin_id + "\n";
      out += "  " + self.size() + "% total\n";
      out += "  " + round(self.quality, 2) + "% quality\n";
      out += "  " + round(self.indicator(), 2) + "% indicator\n";
      out += "-------Features--------------\n";
      _.each(_.values(self.realFeatures()), function(feat) {
        out += round(feat.share, 2) + "% \t" + feat.name() + "\n";
      });
      out += "-----------------------------";
      return out;
    };

    // FIXME: Unused method.
    self.__len__ = function() {
      var self = this;
      return len(_.keys(self._pfeatures));
    };

    // FIXME: Unused method.
    self.__iter__ = function() {
      var self = this;
      return self._pfeatures.iterkeys(); // FIXME: Needs generator-like implementation… :(
    };

    self.__getitem__ = function(key) {
      var self = this;
      var pf = self._pfeatures[key] || null;
      if (pf === null) {
        throw Error('IndexError: ' + key);
      }
      return pf;
    };
  }

  function Database(number, origin_id, quality) {
    var self = this;
    var random = new Random();

    _.extend(self, new ProfileSet(number, origin_id, quality));

    self.maximum = 1;
    self.mergecount = {};

    $property(self, 'sizefactor', function() {
      if (self.maximum > 0) {
        return float(self.number) / self.maximum;
      }
      throw Error('ValueError: ätsch');
    });

    $property(self, 'fill_factor', function() {
      return self.sizefactor();
    });

    $property(self, 'size', function() {
      return round(self.fill_factor() * 100, 2);
    });

    // FIXME: Unused method.
    self.setTotal = function(maximum) {
      self.maximum = maximum;
    };

    self._getMergeCount = function(origin_id) {
      return self.mergecount[origin_id] || 0;
    };

    // FIXME: Unused method.
    self.upgradeFeature = function(feat_name, upgrador_name) {
      var sigmaquad = 0.5;
      var min_random = 0.85;
      var max_random = 0.99;

      var possible = self.getUpgradersFor(self[feat_name]);
      var upgrade_factor = possible[upgrador_name] || null;
      if (upgrade_factor === null) {
        throw Error('IndexError: ' + upgrador_name);
      }
      var pf = self[feat_name];
      var up = self[upgrador_name];
      var old_upgrades = self.upgrade_log[pf.name()] || {};
      var last_upgrade = old_upgrades[up.name] || 0;
      var new_upgrade = float(up.share) / 100 * self.number;
      var up_usable_share = Math.max(0, (new_upgrade - last_upgrade) * 100.0 / self.number);
      if (up_usable_share > 0 === false) {
        return false;
      }
      print("Davor: %s %s%, %s %s% (%s%)", (pf.name, pf.share, up.name, up.share, up_usable_share));
      var dup_raw = float(pf.share) * float(up_usable_share) / 100;
      var dupmax = float(Math.min(pf.share, up_usable_share));
      var dup = Math.max(0, Math.min(dupmax, random.gauss(dup_raw, Math.sqrt(sigmaquad))));
      var better = Math.max(0, up_usable_share - dup);
      var new_share = pf.share + (better * upgrade_factor * random.uniform(min_random, max_random));
      var overflow = 0;
      if (new_share > 100) {
        overflow = 100 - new_share;
        new_share = 100;
      }
      var quality_old = self.quality;
      var total = len(_.keys(self._pfeatures));
      var f_qfactor = 1.0 / total;
      var q_anteil = float(f_qfactor * pf.share) / 100;
      var q_plus = q_anteil * quality_old * float(dup) / 100;
      var q_minus = q_anteil * quality_old * float(overflow) / 100;
      var my_upgrades = self.upgrade_log[pf.name()] || {};
      my_upgrades[up.name] = new_upgrade;
      self.upgrade_log[pf.name()] = my_upgrades;
      pf.setShare(new_share);
      self.quality = Math.max(0, Math.min(100, quality_old + q_plus - q_minus));
      return true;
    };

    self.merge = function(other) {
      var N = 100000;
      var M = .05;
      if (other instanceof ProfileSet === false) {
        throw Error('NotImplemented: ' + other);
      }
      var rand = random.triangular(0, M);
      var mergecount = self._getMergeCount(other.origin_id);
      var sizefactor = self.sizefactor();
      var mergefactor = 1 - float(1) / ((float(mergecount) / N) + 1);
      var maxdupes = Math.min(other.number - 1, self.number);
      var ff = float(self.number) / self.maximum;
      var mindupes = Math.min(Math.max(int(Math.pow(ff, 2) * other.number), self.number + other.number - self.maximum), self.number);
      var dupes = Math.min(maxdupes, mindupes + int(maxdupes * sizefactor * mergefactor + maxdupes * rand));
      var pseudo_increment = other.number - dupes;
      var new_number = Math.min(self.maximum, self.number + pseudo_increment);
      var number_increment = new_number - self.number;
      var real_dupes = other.number - number_increment;
      var q_corr = float(self.quality) / 100;
      var dupe_factor = other.quality;
      if (q_corr > 0) {
        if (other.number < 0) {
          //print(float(real_dupes) / other.number); // FIXME: Might be a mistake here.
          throw Error('ValueError: bubu');
        }
        var divisor = float(real_dupes) / other.number;
        if (divisor < 0) {
          divisor = .0000000000001;
        }
        var dupe_factor = 100 * Math.pow(10, (Math.log(q_corr) / Math.LN10) / divisor);
      }
      var new_quality = float((self.quality * (self.number - real_dupes)) + (dupe_factor * real_dupes) + (other.quality * number_increment)) / (self.number + number_increment);
      _.each(_.values(other._pfeatures), function(pf) {
        var db_pf = self._pfeatures[pf.name()] || null;
        if (db_pf === null) {
          throw Error('IndexError: ' + pf.name());
        }
        var share_mix = Math.max(db_pf.share, float(db_pf.share + pf.share) / 2);
        var new_share = Math.min(100.0, float(((db_pf.share * (self.number - dupes)) + (real_dupes * share_mix) + (pf.share * number_increment)) / (self.number + number_increment)));
        db_pf.setShare(new_share);
      });
      self.number += number_increment;
      self.quality = new_quality;
      self.mergecount[other.origin_id] = mergecount + 1;
    };
  }

  /************************
   Python emulation helpers
   ************************/

  // Simulating the @property decorator
  function $property(context, name, method) {
    context[name] = method;
    context[name].toString = function() {
      console.error('Unsupported call for getter %s.%s; use %s.%s() method instead.', context, name, context, name);
      return 'JavaScriptImplementationError: Unsupported call for getter';
    };
  }

  function print() {
    console && console.log.apply(console, arguments);
  }

  function str(object) {
    if (_.isFunction(object.__unicode__)) {
      return object.__unicode__();
    } else if (_.isFunction(object.__str__)) {
      return object.__str__();
    }
    return object + '';
  }

  function len(object) {
    if (_.isFunction(object.__len__)) {
      return object.__len__();
    }
    return _.size(arguments[0]);
  }

  function int(number) {
    return parseInt(number, 10);
  }

  function float(number) {
    return parseFloat(number); // FIXME: Necessary?
  }

  function round(number, len) {
    if (!len) {
      return Math.round(number);
    }
    return Math.round(number * Math.pow(10, len)) / Math.pow(10, len);
  }

  // The dummy random object
  /*var random = {
    gauss: function(min, max) {
      return random.float.apply(null, arguments);
    },
    uniform: function(min, max) {
      return random.float.apply(null, arguments);
    },
    triangular: function(min, max) {
      return random.float.apply(null, arguments);
    },
    float: function(min, max) {
      var factor = Math.pow(10, 20);
      var n = _.random(min * factor, max * factor);
      return n / factor;
    }
  };*/

  window.Merger = Merger;

}());
