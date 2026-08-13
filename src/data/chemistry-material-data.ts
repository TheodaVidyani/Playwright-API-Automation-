export const chemistryMaterialUploadData = (
  fileBuffer: Buffer,
  overrides = {}
) => ({
  file: {
    name: 'QA_UI_Testing.pdf',
    mimeType: 'application/pdf',
    buffer: fileBuffer
  },

  resourceKey: 'mat-api-test-001',
  previousStorageKey: '',
  topic: 'QA API Testing',

  ...overrides
});


export const saveChemistryMaterialsData = () => ({
  tree: [
    {
      node_id: '38',
      parent_id: null,
      title: '1. Quality Assurance Theory',
      sort_order: 0,
      children: [
        {
          node_id: '39',
          parent_id: '38',
          title: '1.1 QA Fundamentals',
          sort_order: 0,
          children: [],
          resources: []
        },
        {
          node_id: '56',
          parent_id: '38',
          title: '1.2 UI testing',
          sort_order: 1,
          children: [],
          resources: []
        }
      ],
      resources: []
    },
    {
      node_id: '40',
      parent_id: null,
      title: 'New Topic',
      sort_order: 1,
      children: [],
      resources: []
    }
  ]
});