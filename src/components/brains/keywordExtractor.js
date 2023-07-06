import keyword_extractor from 'keyword-extractor'

const sentence =
  'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.'

export function kwExtract(text) {
  const extraction_result = keyword_extractor.extract(text, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false,
  })

  console.log(extraction_result)

  return extraction_result
}
