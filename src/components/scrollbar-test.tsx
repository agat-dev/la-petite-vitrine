'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ScrollbarTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Test de Scrollbar - Selects Multiples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select 1 - Test avec beaucoup d&apos;options
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez une option" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => (
                    <SelectItem key={i} value={`option-${i}`}>
                      Option {i + 1} - Description longue pour tester le scrolling
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select 2 - Test basique
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select simple" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Option A</SelectItem>
                  <SelectItem value="b">Option B</SelectItem>
                  <SelectItem value="c">Option C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select 3 - Test avec contenu scroll
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Beaucoup d&apos;options" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 30 }, (_, i) => (
                    <SelectItem key={i} value={`large-option-${i}`}>
                      Grande option {i + 1} avec un texte très long qui pourrait causer des problèmes de scrollbar
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-600">
            Ouvrez les selects ci-dessus pour tester qu&apos;aucune scrollbar noire n&apos;apparaît.
            <br />
            La page doit rester visuellement stable.
          </p>
        </div>
      </div>
    </div>
  );
}
