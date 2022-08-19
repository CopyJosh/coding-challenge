"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const logs = logSources.map(l => l.pop());
  
  while(true) {
    let output;

    logs.forEach((log, index) => {
      if (log) {
        output = output?.log?.date < log.date
          ? output
          : { log, index };
      }
    });

    if (!output) {
      break;
    }

    logs[output.index] = logSources[output.index].pop();

    printer.print(output.log);
  }

  printer.done();

  return console.log("Sync sort complete.");
};
