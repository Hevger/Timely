const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create CompanyProfile Schema
const OpeningHourSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  hours: [
    {
      monday: {
        start: {
          type: String
        },
        end: {
          type: String
        },
        closed: {
          type: Boolean,
          default: false
        }
      },
      tuesday: {
        start: {
          type: String
        },
        end: {
          type: String
        },
        closed: {
          type: Boolean,
          default: false
        }
      },
      wednesday: {
        start: {
          type: String
        },
        end: {
          type: String
        },
        closed: {
          type: Boolean,
          default: false
        }
      },
      thursday: {
        start: {
          type: String
        },
        end: {
          type: String
        },
        closed: {
          type: Boolean,
          default: false
        }
      },
      friday: {
        start: {
          type: String
        },
        end: {
          type: String
        },
        closed: {
          type: Boolean,
          default: false
        }
      },
      saturday: {
        start: {
          type: String
        },
        end: {
          type: String
        },
        closed: {
          type: Boolean,
          default: false
        }
      },
      sunday: {
        start: {
          type: String
        },
        end: {
          type: String
        },
        closed: {
          type: Boolean,
          default: false
        }
      }
    }
  ]
});

module.exports = Hours = mongoose.model(
  "openingHours",
  OpeningHourSchema,
  "openingHours"
);
