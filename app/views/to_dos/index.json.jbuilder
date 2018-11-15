# frozen_string_literal: true

json.array! @to_dos, partial: 'to_dos/to_do', as: :to_do
