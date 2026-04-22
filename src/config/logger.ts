const logger = {
  info: (msg: string) => process.stdout.write(`[INFO] ${msg}\n`),
  error: (msg: string, err?: unknown) => process.stderr.write(`[ERROR] ${msg} ${err}\n`),
}

export default logger
