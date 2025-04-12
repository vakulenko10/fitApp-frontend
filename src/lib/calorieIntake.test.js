import { describe, expect, test } from 'vitest';
import { calculateCalorieIntake } from '@/lib/calorieIntake';

describe('calculateCalorieIntake tests', () => {
  test('calculates correctly for male, moderate activity, maintain weight', () => {
    const result = calculateCalorieIntake(30, 'male', 70, 175, 'moderate', 'maintainWeight');

    expect(result.calorieIntake).toBeGreaterThan(0);
    expect(result.macronutrients.protein).toBeGreaterThan(0);
    expect(result.macronutrients.fats).toBeGreaterThan(0);
    expect(result.macronutrients.carbs).toBeGreaterThan(0);
    expect(result.macronutrients.fiber).toBeGreaterThan(0);
  });

  test('calculates correctly for female, light activity, lose weight', () => {
    const result = calculateCalorieIntake(25, 'female', 60, 165, 'light', 'loseWeight');

    expect(result.calorieIntake).toBeLessThan(2000);
    expect(result.macronutrients.protein).toBe(110);
    expect(result.macronutrients.fats).toBe(51);
    expect(result.macronutrients.carbs).toBe(169);
    expect(result.macronutrients.fiber).toBe(19);
  });

  test('adjusts intake for gain muscle goal', () => {
    const resultMaintain = calculateCalorieIntake(28, 'male', 75, 180, 'active', 'maintainWeight');
    const resultGain = calculateCalorieIntake(28, 'male', 75, 180, 'active', 'gainMuscle');

    expect(resultGain.calorieIntake).toBeGreaterThan(resultMaintain.calorieIntake);
  });

  test('defaults to sedentary activity if unknown level provided', () => {
    const result = calculateCalorieIntake(40, 'male', 80, 180, 'unknown', 'maintainWeight');
    expect(result.calorieIntake).toBeGreaterThan(0);
  });

  test('defaults to maintainWeight macro distribution if goal is unknown', () => {
    const result = calculateCalorieIntake(35, 'female', 65, 170, 'moderate', 'someWeirdGoal');

    const expectedFiber = 12 * result.calorieIntake / 1000;
    expect(result.macronutrients.fiber).toBeCloseTo(Math.round(expectedFiber));
  });
});
