"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {

    Promise.allSettled(logSources.map(source => source.popAsync()))
      .then(async (logs) => {
        while(true) {  
          let output;

          logs.forEach((logged, index) => {
            const log = logged.value || logged;
      
            if (log) {
              output = output?.log?.date < log.date
                ? output
                : { log, index };
            }
          });

          if (!output) {
            break;
          }

          logs[output.index] = await logSources[output.index].popAsync();

          printer.print(output.log);
        }

      printer.done();
      
      resolve(console.log("Async sort complete."));
    });
  });
};
