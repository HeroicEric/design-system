import templateOnlyComponent from '@ember/component/template-only';

interface HdsFormSuperSelectAfterOptionsSignature {
  Args: {
    clearSelected: () => void;
    content?: string;
    resultCountMessage?: string;
    selectedCount?: string;
    showAll: () => void;
    showNoSelectedMessage?: boolean;
    showOnlySelected?: boolean;
    showSelected: () => void;
  };
}

const HdsFormSuperSelectAfterOptionsComponent =
  templateOnlyComponent<HdsFormSuperSelectAfterOptionsSignature>();

export default HdsFormSuperSelectAfterOptionsComponent;
