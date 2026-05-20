async function main() {
  // OpenAPI generation disabled — re-enable by importing generateDocs and adding it back.
}

await main().catch((e) => {
  console.error('Failed to run pre build script', e)
  process.exit(1)
})
